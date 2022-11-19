import { Faq } from '../cards';
import Boundary from '../boundary';
import { useApi } from '../../hooks';
import { useEffect } from 'react';

const FaqSection = () => {
    // api hook
    const [data, error, load] = useApi("/faqs/");

    useEffect(()=>{console.log(data)},[]);

    return <section className="w-screen flex items-center justify-center min-h-[20em] bg-gray-200">
        <Boundary error={error} load={load}>
            {data?.results?.map(Faq)}
        </Boundary>
    </section>;
};

export default FaqSection;
