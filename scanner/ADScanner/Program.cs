using System;
using System.Collections.Generic;
using Neo4j.Driver;

class Program
{
    static async System.Threading.Tasks.Task Main(string[] args)
    {
        var driver = GraphDatabase.Driver(
            "bolt://localhost:7687",
            AuthTokens.Basic("neo4j", "test1234"));

        var session = driver.AsyncSession(o => o.WithDatabase("neo4j"));
        try
        {
            Console.WriteLine("Neo4j bağlantısı başarılı");

            var users = new List<User> {
                new User {
                    DistinguishedName = "CN=Alice,OU=Users,DC=contoso,DC=local",
                    ObjectSid = "S-1-5-21-1001",
                    WhenCreated = DateTime.Now.AddDays(-30).ToString("o")
                }
            };

            var computers = new List<Computer> {
                new Computer {
                    DistinguishedName = "CN=PC1,OU=Computers,DC=contoso,DC=local",
                    ObjectSid = "S-1-5-21-2001",
                    OperatingSystem = "Windows 10",
                    WhenCreated = DateTime.Now.AddDays(-10).ToString("o")
                }
            };

            var groups = new List<Group> {
                new Group {
                    DistinguishedName = "CN=Admins,OU=Groups,DC=contoso,DC=local",
                    ObjectSid = "S-1-5-21-3001",
                    Description = "Administrators Group",
                    WhenCreated = DateTime.Now.AddDays(-50).ToString("o")
                }
            };

            // User verileri
            foreach (var u in users)
            {
                await session.RunAsync(
                    "CREATE (:User {DistinguishedName: $dn, ObjectSid: $sid, WhenCreated: $created})",
                    new { dn = u.DistinguishedName, sid = u.ObjectSid, created = u.WhenCreated });
            }

            // Computer verileri
            foreach (var c in computers)
            {
                await session.RunAsync(
                    "CREATE (:Computer {DistinguishedName: $dn, ObjectSid: $sid, OperatingSystem: $os, WhenCreated: $created})",
                    new { dn = c.DistinguishedName, sid = c.ObjectSid, os = c.OperatingSystem, created = c.WhenCreated });
            }

            // Group verileri
            foreach (var g in groups)
            {
                await session.RunAsync(
                    "CREATE (:Group {DistinguishedName: $dn, ObjectSid: $sid, Description: $desc, WhenCreated: $created})",
                    new { dn = g.DistinguishedName, sid = g.ObjectSid, desc = g.Description, created = g.WhenCreated });
            }

            var relations = new List<ACLRelation> {
                new ACLRelation {
                    FromSid = "S-1-5-21-1001",
                    ToSid = "S-1-5-21-2001",
                    Type = "GenericAll"
                },
                new ACLRelation {
                    FromSid = "S-1-5-21-3001",
                    ToSid = "S-1-5-21-1001",
                    Type = "WriteDacl"
                }
            };

            foreach (var rel in relations)
            {
                string cypher = $@"
                    MATCH (a {{ ObjectSid: $fromSid }}), (b {{ ObjectSid: $toSid }})
                    CREATE (a)-[r:`{rel.Type}`]->(b)";
                
                await session.RunAsync(cypher, new { fromSid = rel.FromSid, toSid = rel.ToSid });
            }

            Console.WriteLine("İlişkiler eklendi");
            Console.WriteLine("Mock datalar yüklendi");
        }
        finally
        {
            await session.CloseAsync();
            await driver.CloseAsync();
        }
    }
}
