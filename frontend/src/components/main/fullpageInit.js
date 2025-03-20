import fullpage from 'fullpage.js';

export function initFullpage(container) {
  return new fullpage(container, {
    autoScrolling: true,
    navigation: true,
    sectionSelector: '.section',
    // 추가 옵션은 필요에 따라 설정
  });
}