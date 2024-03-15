async function getData() {
    const url = 'https://community-neutrino-currency-conversion.p.rapidapi.com/convert';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'e6c8cc3f57msh376abfe60e16a4dp111485jsnf5932ca6ddcb',
            'X-RapidAPI-Host': 'community-neutrino-currency-conversion.p.rapidapi.com'
        },
        // body: new URLSearchParams({
        //     'from-value': '10',
        //     'from-type': 'NZD',
        //     'to-type': 'GBP'
        // })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

getData();