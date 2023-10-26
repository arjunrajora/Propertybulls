// let index = 1;

// const on = (listener, query, fn) => {
//     document.querySelectorAll(query).forEach(item => {
//         item.addEventListener(listener, el => {
//             fn(el);
//         })
//     })
// }

// on('click', '.selectBtn', item => {
//     const next = item.target.nextElementSibling;
//     next.classList.toggle('toggle');
//     next.style.zIndex = index++;
// });
// on('click', '.option', item => {
//     item.target.parentElement.classList.remove('toggle');

//     const parent = item.target.closest('.select').children[0];
//     parent.setAttribute('data-type', item.target.getAttribute('data-type'));
//     parent.innerText = item.target.innerText;
// })


/*
Reference: http://jsfiddle.net/BB3JK/47/
*/

$('select').each(function () {
    var $this = $(this), numberOfOptions = $(this).children('option').length;

    $this.addClass('select-hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<div class="select-styled"></div>');

    var $styledSelect = $this.next('div.select-styled');
    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select-options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
        //if ($this.children('option').eq(i).is(':selected')){
        //  $('li[rel="' + $this.children('option').eq(i).val() + '"]').addClass('is-selected')
        //}
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function (e) {
        e.stopPropagation();
        $('div.select-styled.active').not(this).each(function () {
            $(this).removeClass('active').next('ul.select-options').hide();
        });
        $(this).toggleClass('active').next('ul.select-options').toggle();
    });

    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        //console.log($this.val());
    });

    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});


// 

$('.boxes-carousel').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 2500,
    dots: false,
    margin: 0,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 4
        }
    }
})

//   

$('.slider-carousel').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 2500,
    dots: false,
    margin: 0,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})

//   

$('.associat-carousel').owlCarousel({
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 2500,
    dots: false,
    margin: 0,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 5
        }
    }
})

$(document).ready(function () {
    $(".side_button").click(function () {
        $(".side_box").addClass("showForm");
    });
});

$(document).ready(function () {
    $(".closeLPop").click(function () {
        $(".side_box").removeClass("showForm");
    });
});



