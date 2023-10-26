function countDown(deadline, element) {
    setInterval(() => {
        timezz(element, {
            date: deadline,
            canContinue: true,
            update(event) {
                document.querySelector('#countdown').querySelector('.seconds').innerHTML =
                    event.seconds === 1 ? 'second' : 'seconds';
            },
        });
    }, 1000);
}
