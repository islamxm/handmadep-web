import styles from './ContentLayout.module.scss';
import Container from '../Container/Container';

const ContentLayout = ({
    children
}: {
    children?: React.ReactNode
}) => {

    return (
        <Container>
            <div className={styles.wrapper}>
                {children}
            </div>
        </Container>
    )

}

export default ContentLayout;