const loadPhone = async (searchText = 13) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones)
}


const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container')
    // remove container
    phoneContainer.textContent = '';

    // all show button
    const showButtonContainer = document.getElementById('show-button-container');
    if (phones.length > 12) {
        showButtonContainer.classList.remove('hidden')
    }
    else {
        showButtonContainer.classList.add('hidden')
    }

    // show per page 12phones
    phones = phones.slice(0, 12)

    phones.forEach(phone => {
        // console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-[280px] bg-gray-100 shadow-xl mx-auto hover:transition hover:translate-6 hover:scale-105 cursor-pointer`;
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
                    <img src="${phone.image}" alt="Shoes"
                        class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>${phone.slug}</p>
                    <div class="card-actions">
                        <button onclick="handleShowDetail('${phone.slug}');" class="bg-sky-500 px-4 py-1 text-white font-semibold rounded-md hover:bg-sky-700 transition-all delay-75 my-2">Show Details</button>
                    </div>
                </div>
        `
        phoneContainer.appendChild(phoneCard)
    })
    toggleSpinnerClick(false)
}

// handle show details
const handleShowDetail = async (id) => {
    onclick = "show_detail_modal.showModal()"
    console.log('show details clicked', id)
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phoneDetail = data.data;
    console.log(phoneDetail)
    show_detail_modal.showModal()

    const showDetail = document.getElementById('show-detail-container');
    showDetail.innerHTML = `
    <div class="flex justify-center mb-10"><img src="${phoneDetail.image}" alt=""></div>
    <h4 class="font-semibold mt-3">${phoneDetail.name}</h4>
    <h4 class=""><span class="font-bold">Storage</span> : ${phoneDetail.mainFeatures?.memory}</h4>
    <h4 class=""><span class="font-bold">displaySize
    </span> : ${phoneDetail.mainFeatures?.displaySize
    }</h4>
    `
}

// handle search
const handleSearchButton = () => {
    // spinner
    toggleSpinnerClick(true)

    const searchInput = document.getElementById('search-field')
    const searchValue = searchInput.value;
    loadPhone(searchValue)
    searchInput.value = ''
}

// toggle spinner button
const toggleSpinnerClick = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

loadPhone()