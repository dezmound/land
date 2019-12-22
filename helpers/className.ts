export interface CssModule {
  [className: string]: string
}

export type Mods = {[modName: string]: string|boolean};

export class ClassName {
  private cssModule: CssModule;
  private cachedClassName: string = '';

  private block: string;
  private element?: string;
  private mods?: Mods;

  constructor (cssModule: CssModule, block: string) {
    this.cssModule = cssModule;
    this.block = block;
  }

  e(element: string): ClassName {
    const copy = this.copy();
    copy.element = element;

    return copy;
  }

  m(mods: Mods): ClassName {
    const copy = this.copy();
    copy.mods = mods;

    return copy;
  }

  concat(classString?: string): ClassName {
    const copy = this.copy();
    copy.cachedClassName += (classString || '').trim();

    return copy; 
  }

  mix(className: ClassName): ClassName;
  mix (block: string): ClassName;
  mix (block: string, elem: string): ClassName;
  mix (block: string, mods: Mods): ClassName;
  mix (block: string, elem: string, mods?: Mods): ClassName;
  mix (blockOrClassName: string | ClassName, elemOrMods?: string | Mods, mods?: Mods): ClassName {
    const copy = this.copy();

    if (blockOrClassName instanceof ClassName) {
      copy.cachedClassName += blockOrClassName.toString();

      return copy;
    }

    copy.cachedClassName += this.getEntityHash(blockOrClassName, elemOrMods, mods);

    return copy;
  }

  private getHash(entityName = '') {
    return this.cssModule[entityName] || entityName;
  }

  private getEntityHash (block: string): string;
  private getEntityHash (block: string, elem: string): string;
  private getEntityHash (block: string, mods: Mods): string;
  private getEntityHash (block: string, elem: string, mods: Mods): string;
  private getEntityHash (block: string, elemOrMods?: string | Mods, mods?: Mods): string;
  private getEntityHash (block: string, elemOrMods?: string | Mods, mods?: Mods): string {
    let className = String(this.cssModule[block] || '');

    switch(typeof elemOrMods) {
      case 'string': {
        className = this.getHash(`${block}__${elemOrMods}`);

        if (mods) {
          for (const modName in mods) {
            if (typeof mods[modName] === 'boolean' && mods[modName]) {
              className += ' ' + this.getHash(`${block}__${elemOrMods}_${modName}`);
            } else if (mods[modName]) {
              className += ' ' + this.getHash(`${block}__${elemOrMods}_${modName}_${mods[modName]}`);
            }
          }
        }

        break;
      }

      case 'object': {
        for (const modName in elemOrMods) {
          if (typeof elemOrMods[modName] === 'boolean' && elemOrMods[modName]) {
            className += ' ' + this.getHash(`${block}_${modName}`);
          } else if (elemOrMods[modName]) {
            className += ' ' + this.getHash(`${block}_${modName}_${elemOrMods[modName]}`);
          }
        }

        break;
      }

      case 'undefined': {
        if (mods) {
          for (const modName in mods) {
            if (typeof mods[modName] === 'boolean' && mods[modName]) {
              className += ' ' + this.getHash(`${block}_${modName}`);
            } else if (mods[modName]) {
              className += ' ' + this.getHash(`${block}_${modName}_${mods[modName]}`);
            }
          }
        }

        break;
      }
    }

    return className;
  }

  toString (): string {
    return String(this.getEntityHash(this.block, this.element, this.mods) + ' ' + this.cachedClassName).trim();
  }

  copy(): ClassName {
    const copy = new (<typeof ClassName>this.constructor)(this.cssModule, this.block);

    copy.element = this.element;
    copy.mods = this.mods;
    copy.cachedClassName = this.cachedClassName;

    return copy;
  }
}

const makeClassName = (cssModule: CssModule, block: string): ClassName => {
  return new ClassName(cssModule, block);
};

export default makeClassName;
