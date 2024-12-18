from fastapi import APIRouter, HTTPException, status

from server.models.form import Form


router = APIRouter()

temp_forms_db = [
    {
        "id": "user_data",
        "data": {}
    },
    {
        "id": "app_config",
        "data": {}
    }
]



@router.get('/',
            status_code=status.HTTP_200_OK,
            description=''
            )
async def read_forms() -> list[Form]:
    return temp_forms_db



@router.get('/{id}',
            status_code=status.HTTP_200_OK,
            description=''
            )
async def read_form(id: str) -> dict:
    for form in temp_forms_db:
        if form["id"] == id:
            return form["data"]
    
    raise HTTPException(
                status.HTTP_404_NOT_FOUND,
                detail='Form does not exists.'
                )



@router.post('/{id}',
            status_code=status.HTTP_200_OK,
            description=''
            )
async def update_form(id: str, form_data: dict) -> dict:
    i = 0
    for form in temp_forms_db:
        if form["id"] == id:
            temp_forms_db[i]["data"] = form_data
            return temp_forms_db[i]
        
        i += 1
    
    raise HTTPException(
                status.HTTP_404_NOT_FOUND,
                detail='Form does not exists.'
                )
