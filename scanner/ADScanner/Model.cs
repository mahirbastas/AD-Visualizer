// Active Directory testi için mock data modeli 
public class User
{
    public string DistinguishedName { get; set; }
    public string ObjectSid { get; set; }
    public string WhenCreated { get; set; }
}

public class Computer
{
    public string DistinguishedName { get; set; }
    public string ObjectSid { get; set; }
    public string OperatingSystem { get; set; }
    public string WhenCreated { get; set; }
}

public class Group
{
    public string DistinguishedName { get; set; }
    public string ObjectSid { get; set; }
    public string Description { get; set; }
    public string WhenCreated { get; set; }
}

// ACL ilişkisi
public class ACLRelation
{
    public string FromSid { get; set; }  // ACL sahibi
    public string ToSid { get; set; }    // Hedef nesne
    public string Type { get; set; }     // GenericAll, WriteDacl, ForceChangePassword
}
