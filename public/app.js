const toCurrency = (price) => {
 return new Intl.NumberFormat('ru-Ru', {
     currency: 'rub',
     style: 'currency'
 }).format(price)
};

const $basket = document.querySelector('#basket');
if ($basket) {
    $basket.addEventListener('click', event => {
        if (event.target.classList.contains('js-remove')) {
            const id = event.target.dataset.id;
            fetch('/basket/remove/' + id, {
                method: 'delete'
            }).then((res) => res.json())
                .then(card => {
                    if (card.courses.length) {
                        const html = card.courses.map((c) => {
                            return `
                            <tr>
                                <td>${c.title}</td>
                                <td>${c.count}</td>
                                <td>
                                    <div class="button btn btn-small js-remove" data-id="${c._id}">Remove</div>
                                </td>
                            </tr>
                            `
                        }).join('');
                        $basket.querySelector('tbody').innerHTML = html;
                        $basket.querySelector('.price').textContent = toCurrency(card.price);
                    } else {
                        $basket.innerHTML = '<p>Empty basket</p>';
                    }
                })
        }
    })
}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent);
});
