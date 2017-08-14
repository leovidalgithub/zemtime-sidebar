(function () {
  'use strict';

  require('./_icons_nav.scss')
  require('./_sidebar.scss')

  var templateFile = require('./template.html')

  angular
    .module('zemtime-sidebar', [])
    .directive('zemSidebar', zemSidebar)
    .controller('SidebarComponentController', SidebarComponentController);

  SidebarComponentController.$invoke = ['$scope', '$rootScope', 'UserFactory', '$state'];

  function SidebarComponentController($scope, $rootScope, UserFactory, $state) {
    $scope.username = UserFactory.getUser();

    $scope.changeState = function (state) {
      if ($rootScope.pendingChanges) {
        $scope.$broadcast('urlChangeRequest', {
          msg: 'From sidebar URL change request',
          nextURL: state
        });
      } else {
        $state.go(state);
      }
    };

    // SIDEBAR RESPONSIVE FUNCTIONALITY

    // Uses jquery
    var menu = $("#sidebar-wrapper");
    var nav = $(".sidebar-nav");
    var bottom = $(".bottom");
    var menuItem = $(".sidebar-nav li");
    var itemList = $(".item");
    var userName = $(".top-separator");
    var menuIconWrapper = $(".menuIconWrapper");
    var menuIcon = $(".menuIcon");
    var mask = $("#mask");

    // On window load
    var viewportWidthLoad = $(window).width();
    if (viewportWidthLoad < 768) {
      menuIcon.click(menuOpen);
      menuItem.click(menuClose);
      mask.click(menuClose);
    }

    // On window resize
    $(window).resize(function () {
      var viewportWidthResize = $(window).width();
      if (viewportWidthResize < 768) {
        menuIcon.fadeIn().click(menuOpen);
        menuItem.click(menuClose);
        mask.removeClass('dsp-block').click(menuClose);
        itemList.fadeOut();
        userName.removeClass('mar-l-10');
        menu.removeClass('wid-230');
        nav.removeClass('wid-230');
        bottom.removeClass('wid-230');
      } else if (viewportWidthResize >= 768) {
        menuIconWrapper.fadeOut();
        mask.fadeOut();
        itemList.fadeIn();
      }
    });

    // FUNCTIONS
    // Open menu & mask and disappear menuIcon
    function menuOpen() {
      userName.addClass('mar-l-10');
      bottom.addClass('wid-230');
      menu.addClass('wid-230');
      nav.addClass('wid-230');
      mask.addClass('dsp-block');
      menuIcon.fadeOut();

      setTimeout(function () {
        itemList.fadeIn(600);
      }, 600);
    }
    // Close menu & mask and show menuIcon
    function menuClose() {
      itemList.fadeOut(50);
      setTimeout(function () {
        userName.removeClass('mar-l-10');
        // itemList.removeClass('mar-l-0');
        bottom.removeClass('wid-230');
        menu.removeClass('wid-230');
        nav.removeClass('wid-230');
        mask.removeClass('dsp-block');
        menuIcon.fadeIn();
      }, 50);

    }

  }

  function zemSidebar() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: templateFile,
      controller: 'SidebarComponentController'
    };
  }
}());