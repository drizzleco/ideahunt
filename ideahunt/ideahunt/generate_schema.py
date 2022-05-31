from ideahunt.graphql.schema import schema
import json

def run():
    introspection_dict = schema.introspect()
    with open("../schema.json", "w") as fp:
        json.dump(introspection_dict, fp)