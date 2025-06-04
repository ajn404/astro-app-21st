export type NavItem = {
  title: string;
  path: string;
  children?: NavItem[];
};

// 1. 获取所有页面文件
const pageModules = import.meta.glob<{ default: any }>(
  '../../pages/**/*.{astro,md,mdx,html}', { eager: true }
);

// 2. 生成页面数据
const pages = Object.entries(pageModules).map(([path, mod]) => ({
  file: path,
  ...mod.default
}));

// 3. 递归构建层级菜单结构
type NavPage = { file: string; [key: string]: any };
type NavTreeNode = { __children: Record<string, NavTreeNode>; __page: NavPage | null };

function buildTree(pages: NavPage[]): Record<string, NavTreeNode> {
  const root: Record<string, NavTreeNode> = {};
  for (const page of pages) {
    const relPath = page.file.split('/pages')[1];
    const segments = relPath.split('/').filter(Boolean);
    let node = root;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i].replace(/\.(astro|md|mdx|html)$/, '');
      if (!node[seg]) {
        node[seg] = { __children: {}, __page: null };
      }
      if (i === segments.length - 1) {
        node[seg].__page = page;
      }
      node = node[seg].__children;
    }
  }
  return root;
}

function treeToNav(tree: Record<string, NavTreeNode>, parentPath = ''): NavItem[] {
  return Object.entries(tree).map(([key, value]) => {
    const page = value.__page;
    const children = treeToNav(value.__children, parentPath + '/' + key);
    let title = key;
    if (page) {
      const fileName = key;
      // index 文件用父目录名
      title = fileName === 'index' ? parentPath.split('/').pop() || 'Home' : fileName;
    }
    return {
      title: title.charAt(0).toUpperCase() + title.slice(1),
      path: parentPath + (key === 'index' ? '' : '/' + key),
      children: children.length > 0 ? children : undefined,
    };
  });
}

const tree = buildTree(pages);
export const sidebarMenu: NavItem[] = treeToNav(tree); 