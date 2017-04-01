from flask.json import JSONEncoder
from datetime import datetime, time


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if hasattr(obj, 'to_dict'):
            return obj.to_dict()
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, time):
            return obj.strftime('%H:%M:%S')
        return JSONEncoder.default(self, obj)
