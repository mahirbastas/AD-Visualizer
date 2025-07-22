from django.db import models

from neomodel import StructuredNode, StringProperty, RelationshipTo

class User(StructuredNode):
    DistinguishedName = StringProperty()
    ObjectSid = StringProperty(unique_index=True)
    WhenCreated = StringProperty()
    generic_all = RelationshipTo('BaseNode', 'GenericAll')
    write_dacl = RelationshipTo('BaseNode', 'WriteDacl')
    force_change_pw = RelationshipTo('BaseNode', 'ForceChangePassword')

class Computer(StructuredNode):
    DistinguishedName = StringProperty()
    ObjectSid = StringProperty(unique_index=True)
    OperatingSystem = StringProperty()
    WhenCreated = StringProperty()

class Group(StructuredNode):
    DistinguishedName = StringProperty()
    ObjectSid = StringProperty(unique_index=True)
    Description = StringProperty()
    WhenCreated = StringProperty()

class BaseNode(StructuredNode):
    # Ortak bir parent gibi davranır
    ObjectSid = StringProperty(unique_index=True)
