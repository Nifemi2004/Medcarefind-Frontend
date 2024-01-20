import styles from './search.module.css';
import Button from '../components/button';
import * as Fa from 'react-icons/fa';
import Link from 'next/link';

const Search: React.FC = () => {
    const onSubmit = (e: any) => {
        console.log(e);
    };

    return (
        <div className={styles.search}>
            <div className={styles.mainText}>Discover Nearby Hospitals with Ease - Your Health, Our Priority.</div>

            <div className={styles.input}>
                <input className={styles.locationInput} placeholder="Search Location" type="text" />
                <div className={styles.middleLine}></div>
                <input className={styles.specialtyInput} placeholder="Search Hospital, Doctors, Specialists and Illnesses" type="text" />
                <div className={styles.buttonsm}>
                    <Link href={'/result'}>
                        <Button width={10} version={'primary'} type={'submit'} isDisabled={false} height={'auto'} onClick={onSubmit}>
                            <Fa.FaSearch />
                        </Button>
                    </Link>
                </div>

                <div className={styles.buttonlg}>
                    <Link href={'/result'}>
                        <Button width={70} version={'primary'} type={'submit'} isDisabled={false} height={'auto'} onClick={onSubmit}>
                            <Fa.FaSearch />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Search;
