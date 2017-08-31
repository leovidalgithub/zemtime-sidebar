(function () {
  'use strict';

  require('./sass/comp-sidebar.scss')

  var templateFile = require('./template.html')

  angular
    .module('zemtime-sidebar', [])
    .directive('zemSidebar', zemSidebar)
    .controller('SidebarComponentController', SidebarComponentController);

  SidebarComponentController.$invoke = ['$scope', '$rootScope', 'UserFactory', '$state', '$timeout'];

  function SidebarComponentController($scope, $rootScope, UserFactory, $state, $timeout) {
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

    $timeout(function(){
        // SIDEBAR RESPONSIVE FUNCTIONALITY

        // VARIABLES
            // General wrappers
            var menu = $("#comp-sb-sidebar-wrapper");
            var nav = $(".comp-sb-sidebar-nav");
            var brand = $(".comp-sb-sidebar-brand");

            // Menu items
            var menuItem = $(".comp-sb-sidebar-nav li:not(.menuIconWrapper)");
            var itemList = $(".item");
            var bottom = $(".bottom");

            // User name
            var userName = $(".comp-sb-top-separator");

            // Hamburguer menu & mask
            var menuIconWrapper = $(".menuIconWrapper");
            var menuIcon = $(".menuIcon");
            var menuText = $(".menuText");
            var mask = $("#comp-sb-mask");

        // HAMBURGUER ICON
            // Open and close menu using the hamburguer button
            // It opens or closes depending on isOpen boolean variable
            var isOpen = false
            menuIconWrapper.click(function () {
                if (!isOpen) {
                    openMenu();
                    isOpen = true;
                } else {
                    closeMenu();
                    isOpen = false;
                }
            });

        // MASK
            // Mask appears when menu is opened using the hamburguer button.
            // Then you can click mask and it'll close the menu.
            // So mask is a secondary way to close menu and also provides focus on sidebar
            mask.click(function () {
                if (isOpen) {
            		closeMenu();
                    isOpen = false;
                }
            });

        // ITEMS LIST
            // Close menu, if open, by clicking them
            itemList.click(function () {
                if (isOpen) {
            		closeMenu();
                    isOpen = false;
                }
            });

        // MEDIA QUERIES
            var tabletBp = window.matchMedia('screen and (min-width: 769px)');

            function changeSize(tabletBp){
                if (tabletBp.matches) {
                        userName.removeClass('mar-l-10');
                        itemList.removeClass('mar-l-0');
                		menuText.removeClass('mar-l-0')
                        bottom.removeClass('wid-230');
                        menu.removeClass('wid-230');
                        nav.removeClass('wid-230');
                        mask.removeClass('dsp-block');

                        itemList.attr('style','');
                        // itemList.fadeIn(300)
                        isOpen = false;
                } else {
                    brTest();
                }
            }

            // IE adding sidebar-brand padding-top
            // --> *correct onResize should not have padding-top
            var browsers = ["Trident", "MSIE", "Edge"];
            var ua =  navigator.userAgent;

            function brTest(){
                for (var i = 0; i < browsers.length; i++) {
                    if (ua.search(browsers[i]) !== -1) {
                        brand.css('padding-top', '8px');
                    }
                }
            }

            // Always watching for changes
            tabletBp.addListener(changeSize);
            changeSize(tabletBp);

        // FUNCTIONS
            // Open menu & mask
            function openMenu(){
                bottom.addClass('wid-230')
                menu.addClass('wid-230')
                nav.addClass('wid-230')

                setTimeout(function(){
                    itemList.fadeIn(300)
                    menuText.fadeIn(300)
                    itemList.addClass('mar-l-0')
                    menuText.addClass('mar-l-0')
                    userName.addClass('mar-l-10')
                    mask.addClass('dsp-block')
                }, 300);

            }

            // Close menu & mask
            function closeMenu(){
                itemList.fadeOut(50);
                setTimeout(function(){
                    userName.removeClass('mar-l-10');
                    itemList.removeClass('mar-l-0');
            		menuText.removeClass('mar-l-0')
                    bottom.removeClass('wid-230');
                    menu.removeClass('wid-230');
                    nav.removeClass('wid-230');
                    mask.removeClass('dsp-block');
                }, 50);
            }
    })
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
