import creditCardType from 'credit-card-type';
import moment from 'moment';

export const calculateTotalTax = (province, totalCost) => {
  let taxObj = [
    { 
      province: 'ON',
      types: [{name: 'HST', value: 0.13}],
      HST: 0.13,
      total: 0.13
    },
    { 
      province: 'AB',
      types: [{name: 'GST', value: 0.05}],
      GST: 0.05,
      total: 0.05
    },
    { 
      province: 'BC',
      types: [{name: 'GST', value: 0.05},{name: 'PST', value: 0.07}],
      PST: 0.07,
      GST: 0.05,
      total: 0.12
    },
    {
      province: 'MB',
      types: [{name: 'GST', value: 0.05},{name: 'PST', value: 0.07}],
      PST: 0.07,
      GST: 0.05,
      total: 0.12
    },
    {
      province: 'NB',
      types: [{name: 'HST', value: 0.15}],
      HST: 0.15,
      total: 0.15
    },
    {
      province: 'NL',
      types: [{name: 'GST', value: 0.15}],
      HST: 0.15,
      total: 0.15
    },
    {
      province: 'NT',
      types: [{name: 'GST', value: 0.05}],
      GST: 0.05,
      total: 0.05
    },
    {
      province: 'NS',
      types: [{name: 'HST', value: 0.15}],
      HST: 0.15,
      total: 0.15
    },
    {
      province: 'NU',
      types: [{name: 'GST', value: 0.05}],
      GST: 0.05,
      total: 0.05
    },
    {
      province: 'PE',
      types: [{name: 'HST', value: 0.15}],
      HST: 0.15,
      total: 0.15
    },
    {
      province: 'QC',
      types: [{name: 'GST', value: 0.05},{name: '*QST', value: 0.0975}],
      GST: 0.05,
      QST: 0.0975,
      total: 0.15
    },
    {
      province: 'SK',
      types: [{name: 'GST', value: 0.05},{name: 'PST', value: 0.06}],
      GST: 0.05,
      PST: 0.06,
      total: 0.15
    },
    {
      province: 'YT',
      types: [{ name: 'GST', value: 0.05}],
      GST: 0.05,
      total: 0.05
    },
  ];

  if(!province) return 0;
  const provinceTax = taxObj.filter((i) => i.province == province);
  const tax = parseFloat(totalCost * provinceTax[0].total).toFixed(2);
  const grandTotal = (parseFloat(totalCost) +  parseFloat(tax)).toFixed(2);

  return { subtotal: totalCost, grandTotal, taxTotal: tax, tax: provinceTax[0].total, taxTypes: provinceTax[0].types }
};

import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
  differenceInCalendarDays
} from 'date-fns';

export class utils {
  static momentDateFormat = (date, format) => moment(date).format(format);
}

export function validateZipCode(inZip) {
	inZip = inZip + "";
	if (inZip  == "00000" || inZip == "00000-0000" ) {
		return false;
	}
    if (inZip.length < 5 || inZip.length > 10){
        return false;
    }
	
	let zipPattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
     
	return zipPattern.test(inZip);
}

export function calculateMealsDeliveryDate() {
  const timeFormat = 'HH:mm:ss';
  const isEvening = moment().isBetween(moment('17:00:00', timeFormat), moment('23:59:59', timeFormat), null, '[]');

  const today = moment().day();
  let addDays = 0;

  switch (today) {
    case 6:
    case 0:
    case 1:
    case 2:
    case 3:
      // Saturday to Wednesday
      if (!isEvening) {
        addDays = 1;
      } else {
        addDays = 2;
      }
      break;
    case 4:
      // Thursday
      if (!isEvening) {
        addDays = 1;
      } else {
        addDays = 3;
      }
      break;
    case 5:
      // Friday
      addDays = 2;
      break;
  }

  const date = moment().add(addDays, 'days');
  return moment(date).format('dddd MMMM D, YYYY').toString();
}

export function chooseCorrectAddress(selectedAddress, patientAddress, myAddress, customAddresses) {
  let addressDisplayArr = [];
  if (selectedAddress === 'patient') {
    addressDisplayArr = patientAddress;
  } else if (selectedAddress === 'myself') {
    addressDisplayArr = myAddress;
  } else if (Number.isInteger(Number(selectedAddress))) {
    customAddresses.forEach(item => {
      if (Number(item.addressId) === Number(selectedAddress)) {
        const itemName = `${item.firstName} ${item.lastName}`;
        item.name = itemName;
        addressDisplayArr = item;
      }
    });
  }
  return addressDisplayArr;
}

export function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function getDayShort(currentDay) {
  let day = '';
  switch (currentDay) {
    case 0: day = 'mon'; break;
    case 1: day = 'tue'; break;
    case 2: day = 'wed'; break;
    case 3: day = 'thu'; break;
    case 4: day = 'fri'; break;
    case 5: day = 'sat'; break;
    case 6: day = 'sun'; break;
  }
  return day;
}

export function nearestPastMinutes(interval, someMoment) {
  const roundedMinutes = Math.ceil(someMoment.minute() / interval) * interval;
  return someMoment.clone().minute(roundedMinutes).second(0);
}

export function getItemFromKey(data, itemId) {
    return (data || []).filter(function(item) {
        return (item.key == itemId)
    })[0]
}

export function formatTime(data) {
    let times = data.split(' - ');
    return moment(times[0], 'h:mm').format('h:mm A') + ' - ' + moment(times[1], 'h:mm').format('h:mm A')
}

export function isImageExt(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

export const currencyFormat = num => '$' + Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export const uppercaseFirst = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const decimalTwoPlaces = number => {
  const parseNumber = parseFloat(Math.round(number * 100) / 100).toFixed(2);
  return parseNumber;
};

export function timeConvert(num) {
  const hours = (num / 60);
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  if (rminutes > 0) {
    return pluralize(rhours, 'hour') + " and " + pluralize(rminutes, 'minute');
  }
  return pluralize(rhours, 'hour');
}

export const pluralize = (count, singular, showCount = true) => {
  let pluralString;
  if (
    typeof count !== 'undefined' &&
    count !== null &&
    count !== '' &&
    parseInt(count, 10) !== 1
  ) {
    pluralString = `${singular}s`;
  } else {
    pluralString = `${singular}`;
  }
  if (showCount) {
    pluralString = `${count} ${pluralString}`;
  }
  return pluralString;
};

export const insert = (arr, index, newItem) => [
  ...arr.slice(0, index),
  newItem,
  ...arr.slice(index)
];

export const validateEmail = email => {
  const expression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return expression.test(String(email).toLowerCase());
};

export const validateInput = input => {
  const expression = /^[a-zA-Z0-9-\s]*$/;
  return !expression.test(input);
};

export const validateLettersNumbers = input => {
  const expression = /^[a-zA-Z0-9\s]*$/;
  return !expression.test(input);
};

export const validateInputLetters = input => {
  const expression = /^[a-zA-Z-\s]*$/;
  return !expression.test(input);
};

export const validatePostalCode = input => {
  const expression = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
  return !expression.test(input);
};

export function onlyNumbers(text) {
  return text.replace(/[^0-9]/g, '');
}

export const numberOnly = number => {
  const num = number.match(/^\+?\d+/g, '') || [];
  return num.join('');
};

export function formatPhoneNumber(s) {
  const s2 = ('' + s).replace(/\D/g, '');
  const m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
  return !m ? null : '(' + m[1] + ') ' + m[2] + '-' + m[3];
}

export function formatPostalCode(s) {
  let num = s.match(/.{1,3}/g);
  return num.join(' ');
}

export function formatDateDifference(currentTime, data) {
  const diffToNowDays = differenceInCalendarDays(currentTime, data);

  if (diffToNowDays < 1) {
    const diffToNowSeconds = differenceInSeconds(currentTime, data);
    if (diffToNowSeconds < 60) {
      if (diffToNowSeconds === 0) {
        return 'Now';
      }
      return `${diffToNowSeconds}s`;
    }
    const diffToNowHours = differenceInHours(currentTime, data);
    if (diffToNowHours < 1) {
      const diffToNowMins = differenceInMinutes(currentTime, data);
      return `${diffToNowMins}m`;
    }
    return `${diffToNowHours}h`;
  } else if (diffToNowDays <= 30) {
    return `${diffToNowDays}d`;
  } else if (diffToNowDays >= 31 && diffToNowDays <= 182) {
    return `${Math.floor(diffToNowDays / 7)}w`;
  } else if (diffToNowDays >= 193 && diffToNowDays <= 365) {
    return `${Math.floor(diffToNowDays / 30)}m`;
  }
  return `${Math.floor(diffToNowDays / 365)}y`;
}

export function strNotNull(str) {
  if (str === undefined || str === null || str.length === 0) return false;
  else return true;
}

export function isEmptyObject(e) {
  let t;
  for (t in e) return !1;
  return !0;
}

export function prettyCardNumber(cardNumber, cardType) {
  const card = creditCardType.getTypeInfo(cardType);

  if (card) {
    const offsets = [].concat(0, card.gaps, cardNumber.length);
    const components = [];

    for (let i = 0; offsets[i] < cardNumber.length; i += 1) {
      const start = offsets[i];
      const end = Math.min(offsets[i + 1], cardNumber.length);
      components.push(cardNumber.substring(start, end));
    }
    return components.join(' ');
  }
  return cardNumber;
}

export function extractCardType(cardType) {
  return cardType && cardType.length ? cardType[0].type : 'unknown';
}

export function randomString(len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
  }
  return randomString;
}

export const genRanHex = size => [...Array(size)]
  .map(() => Math.floor(Math.random() * 16).toString(16)).join('');
