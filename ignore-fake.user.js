// ==UserScript==
// @name         IgnoreFakeInsiders
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       ifitzsimmons
// @match        https://247sports.com/college/penn-state/board/18/Contents/michigan-officially-accused*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

function ignoreFake () {
    'use strict';

  const trollNames = ['fakePSUinsider'];
  const $itemRows = $(".replies-item");

  const $rowsToHide = $itemRows.filter(function(idx) {
      const $userName = $(this).find('.user-name').text();
      let $quotedUser;

      const $blockQuoteSection = $(this).find('.block-quote-section');

      if ($blockQuoteSection) {
          const $userNamePath = $blockQuoteSection.find('a').attr('href');

          if ($userNamePath && $userNamePath.startsWith('/user/')) {
              $quotedUser = $userNamePath.split('/')[2];
          }
      }

      return trollNames.includes($userName) || trollNames.includes($quotedUser);
  });

  $rowsToHide.hide();
}

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(ignoreFake);
observer.observe(document.querySelector('ul.board-pagination'), config);
ignoreFake();


