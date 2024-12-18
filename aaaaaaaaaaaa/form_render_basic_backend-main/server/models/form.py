from pydantic import BaseModel

class Form(BaseModel):
    id: str
    data: dict
    

    class Config:
        schema_extra = {
            'example': {
                'id': 'form1',
                'data': '{"field1": "ex", "field2": "ample"}',
            }
        }