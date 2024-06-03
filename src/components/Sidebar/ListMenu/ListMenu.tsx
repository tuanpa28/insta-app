import { DropdownDisplay } from '@/components/common/display';
import { NavLinkProps } from '@/constants/routes';
import MenuItem from './MenuItem';

const ListMenu = ({ items }: { items: NavLinkProps[] }) => {
  return (
    <ul className='space-y-2 font-medium'>
      {items.map((item, i) => {
        if (item.dropdown) {
          return (
            <DropdownDisplay key={i} trigger={<MenuItem item={item} />}>
              {item.dropdown}
            </DropdownDisplay>
          );
        }
        return <MenuItem item={item} key={i} />;
      })}
    </ul>
  );
};

export default ListMenu;
