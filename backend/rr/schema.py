import graphene
import rr.queries as q


class Prompt(graphene.ObjectType):
    id = graphene.Int()
    date = graphene.String()
    prompt = graphene.String()


class Query(graphene.ObjectType):
    prompt = graphene.Field(Prompt, date=graphene.String())

    @graphene.resolve_only_args
    def resolve_prompt(self, date):
        return Prompt(**q.get_prompt_by_date(date).to_dict())


schema = graphene.Schema(query=Query)
