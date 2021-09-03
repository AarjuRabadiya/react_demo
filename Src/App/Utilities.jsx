export const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1)
};

export const removeValueFromArray = (arr) => {
    let what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
};

export const minLength = (len, str) => {
    if(str === null) return false;
    if(str.length < len) {
        return false;
    }

    return true;
};

export const truncate = (str, n) => {
    return (str.length > n) ? str.substr(0, n-1) + '...' : str;
};

export const validateUsername = (username) => {
    if( /[^a-zA-Z0-9-_]/.test( username ) ) {
        return false;
    }
    return true;
};

export const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const convertDate = (date) => {
    const options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'};
    const time =  new Date(parseInt(date)).toLocaleDateString('en-US', {hour: '2-digit', minute:'2-digit', timeZone: 'UTC'});

    date = new Date(parseInt(date)).toLocaleDateString('en-US', options);
    return date +' '+ time;
};

export const nextParticipationWindow = (timestamp) => {

    timestamp = timestamp - Math.floor(Date.now() / 1000);
    let delta = timestamp;
    let days = Math.floor(delta / 86400);

    delta -= days * 86400;
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    let seconds = delta % 60;  // in theory the modulus is not required
    let t_str = '';

    if(hours > 0) {
        hours = (days * 24) + hours;
        if (hours < 10) {
            hours  = parseInt(0+hours);
        }
        if(hours < 0) {
            hours = 0;
        }
        t_str += hours + ' hours ';
    }
    if(minutes > 0) {
        if (minutes < 10) {minutes = "0"+minutes;}
        t_str += minutes + ' minutes ';
    }
    if (seconds < 10) {seconds = "0"+seconds;}
    t_str += seconds + ' seconds';


    return t_str;
};

/**
 * Parse the Mining tokens and return as array + json string
 * [ oid, hashrate, table_name ]
 * @param arr
 */
export const createParticipationString = (arr, selected) => {
    let combinedArr = [];
    arr.map((item) => {
        if(selected.includes(item._id.$oid)) {
            const hash = item.hashrate;
            const id = item.contract_address || item.owner || item.owner_addresses;

            let table_name = item.table_name;

            if(item.token_type && item.token_type === 'CGTLE') {
                table_name = 'cgnft_le';
            }

            const asset_id = item.assetId;
            const newStr = id+':'+asset_id+':'+hash+':'+table_name;
            combinedArr.push(newStr);
        }
    });

    return combinedArr;
};

export const mergeNFTArray = (arr) => {
    const newArr = [];

    for (let i = 0; i < arr.length; i++) {
        for(let l = 0; l < arr[i].items.length; l++) {
            arr[i].items[l].table_name = arr[i].table_name;
        }

        newArr.push(arr[i].items);
    }

    return [].concat.apply([], newArr);
};


export const elementInViewport = (el) => {
    let top = el.offsetTop;
    let left = el.offsetLeft;
    let width = el.offsetWidth;
    let height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
};

export const trim = (text = '', amount = 100) => {
    return text.substr(0,amount-1)+(text.length>amount?'...':'');
};

export const scrollBy = (distance, duration) => {
    let initialY = window.pageYOffset;
    let y = distance;
    let baseY = (initialY + y) * 0.5;
    let difference = initialY - baseY;
    let startTime = performance.now();

    function step() {
        let normalizedTime = (performance.now() - startTime) / duration;
        if (normalizedTime > 1) normalizedTime = 1;

        window.scrollTo(0, baseY + difference * Math.cos(easeInOutCirc(normalizedTime) * Math.PI));
        if (normalizedTime < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);

};
