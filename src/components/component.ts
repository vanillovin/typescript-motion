export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
  // 어딘가로부터 나 자신을 제거. parent 컨테이너로부터 나 자신을 제거하는 API
  removeFrom(parent: HTMLElement): void;
}

/**
 * Encapsulate the HTML element creation
 * HTMLElement를 만드는 것을 캡슐화
 * BaseComponent는 Component interface의 규격을 따라가는 클래스!
 */
export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;

  constructor(htmlString: string) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }

  removeFrom(parent: HTMLElement) {
    if (parent !== this.element.parentElement) {
      throw new Error('Parent mismatch!');
    }
    parent.removeChild(this.element);
  }
}