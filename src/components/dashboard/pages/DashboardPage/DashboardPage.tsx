import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { GitHubUser } from '../../../../interfaces/user';
import classes from './DashboardPage.module.css';

interface DashboardPageProps {
    // Title text for the header
    title: string;
    // Github user information
    user: GitHubUser;
}

/**
 * Dashboard page that displays the github user information
 */
const DashboardPage = ({
    title,
    user: { avatarURL, bio, username, numFollowers, numFollowing, numPublicGists, numPublicRepos }
}: DashboardPageProps) => {
    const getField = (label: string, value: string | number) => (
        <Typography variant='body2' color='textSecondary' component='p'>
            <label>{label}</label>
            {value}
        </Typography>
    );

    return (
        <div className={classes.DashboardPage}>
            <div className={classes.Header}>
                <Typography variant='h5' component='h4'>
                    {title}
                </Typography>
            </div>
            <Card className={classes.Card}>
                <CardMedia
                    className={classes.CardMedia}
                    component='img'
                    alt='Avatar'
                    image={avatarURL}
                    title='User avatar'
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        GitHub User Info
                    </Typography>
                    {getField('User name: ', username)}
                    {bio ? getField('Bio: ', bio) : null}
                    {getField('Followers: ', numFollowers)}
                    {getField('Following: ', numFollowing)}
                    {getField('Public repos: ', numPublicRepos)}
                    {getField('Public gists: ', numPublicGists)}
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardPage;
