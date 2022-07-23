type Nav = {
    title: string;
    id: string;
};
type Props = {
    id: number;
    nav: Nav;
};

const NavigationBar = (props: Props) => {
    const { nav, id } = props;
    return (
        <p
            key={id}
            className="rounded-lg px-3 py-2 text-slate-700 font-medium hover:text-red-600 cursor-pointer"
        >
            {nav.title}
        </p>
    );
};

export default NavigationBar;
