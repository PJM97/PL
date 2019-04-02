﻿$(document).ready(function () {
    $('.um-mobile-menu-button').click(function () {
        $('.um-mobile-menu').show();
        return false;
    });

    $('.um-mobile-menu-close').click(function () {
        $('.um-mobile-menu').hide();
        return false;
    });

    $('.um-mobilevariations a[href = "#"]').click(function () {
        return false;
    });

    $('.um-mobile-menu .ms-core-listMenu-root li').each(function () {
        if ($(this).children('ul').length != 0) {
            $(this).addClass('children');

            $(this).children('a').before('<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>');
        }
    });

    $('.um-mobile-menu .ms-core-listMenu-root li').on('click', '.glyphicon-plus', function () {
        $(this).removeClass('glyphicon-plus').addClass('glyphicon-minus').siblings('ul').slideDown('400');
        return false;
    });

    $('.um-mobile-menu .ms-core-listMenu-root li').on('click', '.glyphicon-minus', function () {
        $(this).removeClass('glyphicon-minus').addClass('glyphicon-plus').siblings('ul').slideUp('400');
        return false;
    });

    $('.um-mobile-menu li.selected').parents('ul').show().siblings('a').addClass('ms-core-listMenu-selected');

});