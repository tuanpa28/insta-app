import { DropdownDisplay } from '@/components/common/display';
import { NavLinkProps } from '@/constants/common';
import MenuItem from './MenuItem';

const ListMenu = ({ items }: { items: NavLinkProps[] }) => {
  return (
    <ul className='font-medium'>
      {items.map((item, i) => {
        if (item.dropdown) {
          return (
            <DropdownDisplay key={i} trigger={<MenuItem item={item} />}>
              {item.dropdown}
            </DropdownDisplay>
          );
        }
        if (item.component) {
          return (
            <>
              <MenuItem item={item} />
              {item.component}
            </>
          );
        }
        return <MenuItem item={item} key={i} />;
      })}
    </ul>
  );
};

export default ListMenu;
