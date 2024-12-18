function renderDefault(_) {
    return document.createElement('div')
}

function renderTextField(config) {
    let container = document.createElement('div')
    container.classList.add('textField')
    
    if(config.labelOnTop) {
        container.style.flexDirection = 'column'
    }

    if (config.label) {
        let label = document.createElement('label')
        label.for = config.id
        label.innerText = config.label
        container.appendChild(label)
    }

    let field = document.createElement('input')
    field.type = 'text'
    field.id = config.id
    
    field.addEventListener('input', () => {
        config.state[field.id] = field.value
        if (config.stateView) {
            config.stateView.innerText = JSON.stringify(config.state)
        }})
    
    
    container.appendChild(field)

    return container;
}
    
function renderNumberField(config) {
    let container = document.createElement('div')
    container.classList.add('numberField')

    if(config.labelOnTop) {
        container.style.flexDirection = 'column'
    }

    if(config.label){
        let label = document.createElement('label')
        label.for = config.id
        label.innerText = config.label
        container.appendChild(label)
    }

    let field = document.createElement('input')
    field.type = 'text'
    field.id = config.id
    

    field.addEventListener('input', () => {
        field.value = field.value.replace(/\D/g, "")
        config.state[field.id] = parseInt(field.value)
        if (config.stateView) {
            config.stateView.innerText = JSON.stringify(config.state)
        }})
    
    container.appendChild(field)
    
    return container;
}

function renderEmail(config) {
    let container = document.createElement('div')
    container.classList.add('emailField')
    
    if(config.labelOnTop) {
        container.style.flexDirection = 'column'
    }

    if(config.label){
        let label = document.createElement('label')
        label.innerText = config.label
        container.appendChild(label)
    }

    let emailContainer = document.createElement('div')
    let user = document.createElement('input')
    let at = document.createElement('div')
    let domain = document.createElement('input')

    emailContainer.classList.add('emailContainer')

    at.innerText = '@'
    user.type = 'text'
    domain.type = 'text'

    let userState = "";
    let domainState = "";

    user.addEventListener('input', () => {
        userState = user.value
        config.state[container.id] = `${userState}@${domainState}`
        if (config.stateView) {
            config.stateView.innerText = JSON.stringify(config.state)
        }
    })

    domain.addEventListener('input', () => {
        domainState = domain.value
        config.state[container.id] = `${userState}@${domainState}`
        if (config.stateView) {
            config.stateView.innerText = JSON.stringify(config.state)
        }
    })

    emailContainer.appendChild(user)
    emailContainer.appendChild(at)
    emailContainer.appendChild(domain)

    container.appendChild(emailContainer)

    return container
}

export function renderField(config) {
    let field;
    switch (config.type) {
        case 'text': field = renderTextField(config); break;
        case 'number': field = renderNumberField(config); break;
        case 'email': field = renderEmail(config); break;
        default: field = renderDefault(config);
    }

    return field
}