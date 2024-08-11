import { useState, useEffect } from 'react';
import { isAuthenticated } from '../../lib/authenticate';
import SearchForm from '../components/SearchForm'; 
import { useRouter } from 'next/router';


export default function Home() {
    const [authStatus, setAuthStatus] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/_error');
            return;
        }
    }, []);

    return (
        <SearchForm />
    );
}
