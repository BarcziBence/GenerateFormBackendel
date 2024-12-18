import { renderField } from "./fields.js";

export function renderForm(config) {
    let formState = {}
    let form = document.createElement('div')
    form.classList.add('formContainer')
    let stateView = document.createElement('div')
    stateView.classList.add('stateView')

    if (config.showState) {
        stateView.text = JSON.stringify(formState)
        form.appendChild(stateView)
    }

    config.fields.forEach(fieldConfig => {
        fieldConfig.labelOnTop = config.labelOnTop
        fieldConfig.state = formState
        if (config.showState) {
            fieldConfig.stateView = stateView
        }
        form.appendChild(renderField(fieldConfig))
    });

    if (config.controls) {
        let controls = document.createElement('div')
        controls.classList.add('formControls')
        let save = document.createElement('button')
        save.type = 'button'
        save.innerText = config.controls.onSave.label
        save.onclick = () => {
            config.controls.onSave.fn(formState)
        }

        let clear = document.createElement('button')
        clear.type = 'button'
        clear.innerText = config.controls.onClear.label
        clear.onclick = () => {
            console.log(formState) // TODO: why is it not clearing the state?
            config.controls.onClear.fn(formState, stateView, form.getElementsByTagName('input'))
            console.log(formState)
        }

        controls.appendChild(save)
        controls.appendChild(clear)
        form.appendChild(controls)
    }

    return form
}