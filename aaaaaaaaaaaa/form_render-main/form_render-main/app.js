import { renderForm } from "./form.js"

let app = document.getElementById('app')

let form = renderForm({
    showState: true,
    labelOnTop: true,
    controls: {
        onSave: {
            label: 'Save',
            fn: (state) => {
                fetch("http://localhost:8001/forms/user_data",
                    {
                        method: "POST",
                        headers: {
                            'Access-Control-Allow-Origin' : '*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(state)

                    }
                )
            }
        } ,
        onClear: {
            label: 'Clear',
            fn: (state, stateView, elements) => {
                if (stateView){
                    stateView.innerText = ""
                }
                Array.from(elements).forEach(element => {
                    element.value = null
                })
                state = {}
            }
        }
    },
    fields: [
        {
            id: 'id1',
            type: 'text',
            label: 'felirat',
        },
        {
            id: 'id2',
            type: 'number',
            label: 'felirat2',
        },
        {
            id: 'id3',
            type: 'email',
            label: 'felirat3',
        }
    ]
})

app.appendChild(form)