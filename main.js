const popup = document.querySelector('.popup');
const addBtn = document.querySelector('.summary__add');
const removeBtn = document.querySelector('.summary__remove');
const cancelBtn = document.querySelector('.popup__cancel');
const saveBtn = document.querySelector('.popup__save');
const day = document.querySelector('.summary__day');
const night = document.querySelector('.summary__night');
const summarySum = document.querySelector('.summary__sum');
const data = document.querySelector('.data');
const summary = document.querySelector('.summary');
const expenseList = document.querySelector('.expense__list');
const profitList = document.querySelector('.profit__list');
const list = document.querySelectorAll('.list');
const root = document.querySelector(':root');
const inputCost = document.querySelector('#cost');
const inputName = document.querySelector('#name');
const select = document.querySelector('select');
const removeElement = document.getElementsByClassName('fa-xmark');
const plus = [];
const minus = [];
let sum;

const allMoney = () => {
	let plusSum = 0;
	let minusSum = 0;
	for (let i = 0; i < plus.length; i++) {
		plusSum += plus[i];
	}
	for (let i = 0; i < minus.length; i++) {
		minusSum += minus[i];
	}
	sum = plusSum + minusSum;
	// console.log(plusSum);
	// console.log(minusSum);
	summarySum.textContent = `${sum} zł`;
};

const showPop = () => {
	popup.classList.add('showPop');
};
const hidePop = () => {
	popup.classList.remove('showPop');
	select.value = '0';
	inputCost.value = '';
	inputName.value = '';
};
const removeAll = () => {
	list.forEach((el) => {
		el.innerHTML = '';
	});
	summarySum.textContent = `0 zł`;
};
const remEl = (e) => {
	if (e.target.classList.contains('fa-xmark')) {
		e.target.closest(`li`).remove();
		const price = parseInt(e.target.previousElementSibling.textContent);
		console.log(price);
		if (price < 0) {
			const priceIndexMinus= minus.indexOf(price);
			console.log(priceIndexMinus);
			minus.splice(priceIndexMinus, 1);
		} else {
			const priceIndexPlus = plus.indexOf(price);
			console.log(priceIndexPlus);
			plus.splice(priceIndexPlus, 1);
		}
		allMoney();
	}
};
const changeDay = () => {
	day.classList.add('day');
	root.style.setProperty('--day', '#071c2e');
	root.style.setProperty('--night', 'white');
};
const changeNight = () => {
	root.style.setProperty('--day', 'white');
	root.style.setProperty('--night', '#071c2e');
};

const createElement = () => {
	const li = document.createElement('li');
	const price = parseInt(inputCost.value);
	const name = inputName.value;
	const category = select.selectedIndex;
	let icon;

	if (category === 1) {
		icon = 'cart-arrow-down';
	} else if (category === 2) {
		icon = 'burger';
	} else {
		icon = 'film';
	}

	if (inputCost.value.includes('-')) {
		li.innerHTML = `<div class="expense__name">
		<i class="fa-solid fa-${icon}"></i>
		<p class="expense__paragraf">${name}</p>
		</div>
		<div class="expense__value">
		<p class="expense__amount">${price}</p>
		<i class="fa-solid fa-xmark"></i>
		</div>`;
		li.classList.add('listElement', 'expense__listElement');
		expenseList.append(li);
		minus.push(price);
	} else {
		li.innerHTML = `<div class="profit__name">
		<i class="fa-solid fa-money-bill-1-wave"></i>
		<p class="profit__paragraf">${name}</p>
		</div>
		<div class="profit__value">
		<p class="profit__amount">${price}</p>
		<i class="fa-solid fa-xmark"></i>
		</div>`;
		li.classList.add('listElement', 'profit__listElement');
		profitList.append(li);
		plus.push(price);
	}

	hidePop();
};
const checkForm = () => {
	if (
		select.selectedIndex >= 1 &&
		inputCost.value !== '' &&
		inputName.value !== ''
	) {
		createElement();
		allMoney();
	} else {
		alert('Wypełnij wszystkie pola!');
	}
};
addBtn.addEventListener('click', showPop);
removeBtn.addEventListener('click', removeAll);
cancelBtn.addEventListener('click', hidePop);
saveBtn.addEventListener('click', checkForm);
day.addEventListener('click', changeDay);
night.addEventListener('click', changeNight);
data.addEventListener('click', remEl);
