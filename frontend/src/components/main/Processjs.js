// Processjs.js
export function initParallax(container) {
  const parallaxScroll = () => {
    const scrolled = window.scrollY;

    // container 내부에서 요소 선택
    const layer1 = container.querySelector('.layer1');
    const layer2 = container.querySelector('.layer2');
    const layer3 = container.querySelector('.layer3');
    if (layer1) {
      layer1.style.top = `${0 - scrolled * 0.25}px`;
    }
    if (layer2) {
      layer2.style.top = `${0 - scrolled * 0.5}px`;
    }
    if (layer3) {
      layer3.style.top = `${0 - scrolled * 0.75}px`;
    }

    // rock 이미지 업데이트
    const rock1 = container.querySelector('.rock1');
    const rock2 = container.querySelector('.rock2');
    const rock3 = container.querySelector('.rock3');
    const rock4 = container.querySelector('.rock4');
    const rock5 = container.querySelector('.rock5');
    const rock6 = container.querySelector('.rock6');
    const rock7 = container.querySelector('.rock7');
    const rock8 = container.querySelector('.rock8');
    const rock9 = container.querySelector('.rock9');
    if (rock1) {
      rock1.style.top = `${400 - scrolled * 0.8}px`;
    }
    if (rock2) {
      rock2.style.top = `${200 - scrolled * 0.6}px`;
    }
    if (rock3) {
      rock3.style.top = `${500 - scrolled * 0.4}px`;
    }
    if (rock4) {
      rock4.style.top = `${600 - scrolled * 0.5}px`;
    }
    if (rock5) {
      rock5.style.top = `${600 - scrolled * 0.7}px`;
    }
    if (rock6) {
      rock6.style.top = `${400 - scrolled * 0.7}px`;
    }
    if (rock7) {
      rock7.style.top = `${600 - scrolled * 0.5}px`;
    }
    if (rock8) {
      rock8.style.top = `${200 - scrolled * 0.2}px`;
    }
    if (rock9) {
      rock9.style.top = `${200 - scrolled * 0.4}px`;
    }
  };

  window.addEventListener('scroll', parallaxScroll);
  

  // 이벤트 리스너 제거 함수 반환
  return () => {
    window.removeEventListener('scroll', parallaxScroll);
  };
}
