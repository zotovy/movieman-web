import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../styles/globals.css";

import ReviewComponent, { Props } from "../components/review";

export default {
    title: 'Components/Review',
    component: ReviewComponent,
} as Meta;

export type StoryProps = Omit<Props, "comments"> & {
    amountOfComments: number,
    width: string,
    userProfilePic: string,
    userName: string,
};

const defaultComment: ReviewComment = {
    id: 123,
    author: 123,
    content: "cool!",
    createdAt: new Date(),
    review: 123,
};

const TemplateDefault: Story<StoryProps> = (args) => {
    const comments: ReviewComment[] = new Array(args.amountOfComments).fill(defaultComment);
    return <div style={{ width: args.width }}>
        <ReviewComponent {...args} user={{
            profileImagePath: args.userProfilePic.length == 0 ? undefined : args.userProfilePic,
            name: args.userName,
        }}  comments={comments} />
    </div>;
}

export const Primary = TemplateDefault.bind({});
Primary.args = {
    userProfilePic: "https://d3bzyjrsc4233l.cloudfront.net/news/IMG_2085.jpeg",
    userName: "Денис Караев",
    rating: 5,
    amountOfComments: 3,
    content: "Прекрасный фильм! Ничего лучше не смотрел за последние несколько лет. Тарантино – гений!",
    width: "560px"
};



