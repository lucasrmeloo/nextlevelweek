function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((response) => { return response.json() })
    .then((states) => { 

        for(state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
     })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city")

    const stateInput = document.querySelector("input[name=state")
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione sua cidade</option>";
    citySelect.disabled = true

    fetch(url)
    .then((response) => { return response.json() })
    .then((cities) => { 
       for(city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
     })
}

document
    .querySelector("select[name=uf")
    .addEventListener("change", getCities)

/**
 * Itens de coleta
 */
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(let item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

// itens selecionados
let selectedItems = []
const collectedItems = document.querySelector("input[name=items]")

function handleSelectedItem(event) {
    const itemLi = event.target
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    /**
     * Verificar a exixtencia de itens selecionados, caso true pegar itens selecionados
     * Se já selecioado tirar da seleção
     * Se não selecionado, adcionar a seleção
     * Atualizar campo hidden com os dados selecionados
     */

    const alreadySelected = selectedItems.findIndex( (item) => {
        return item == itemId
    } )

    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter((item) => {
            return item != itemId
        })
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
}