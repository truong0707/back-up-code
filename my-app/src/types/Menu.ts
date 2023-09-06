export interface typeMenu {
  url: string;
  name: string;
  iconClass: string;
  children: [];
}

export interface typeMenuNoChildren {
  url: string;
  name: string;
  iconClass: string;
}

export interface typeMenuHaveId extends typeMenu {
  id: string | number;
}

export interface DataTypecolumnsMenu {
  url: string;
  title: string;
  id: string;
  children: any[];
  key: number;
}


/* Sub menu */
export interface TypeSubmenu {
  id: string | number;
  title: string;
  url: string
  children: any[];
}