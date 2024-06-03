import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface IDropdownMore {
  className?: string;
  items: any[];
}

const DropdownMore = ({ className, items }: IDropdownMore) => {
  return (
    <DropdownMenuContent className={`w-60 rounded-2xl ${className}`}>
      {items?.map((item, i) =>
        item.separator ? (
          <DropdownMenuSeparator
            key={i}
            className={`bg-stone-200 ${item.size === 'large' && 'h-1'}`}
          />
        ) : (
          <DropdownMenuGroup key={i} className='p-1'>
            {item.group.map(({ Icon, text }: any, subIndex: number) => (
              <DropdownMenuItem
                key={subIndex}
                className='hover:cursor-pointer hover:!bg-stone-200 p-4 rounded-lg'
              >
                {Icon}
                <span className='text-sm font-normal'>{text}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        ),
      )}
    </DropdownMenuContent>
  );
};

export default DropdownMore;
