import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import "../styles/globals.css";

import Comment, { Props } from "@/components/comment";

export default {
    title: 'Components/Comment',
    component: Comment,
} as Meta;

type StoryProps = Props & {
    width: string
}

const TemplateDefault: Story<StoryProps> = (args) => <div style={{ width: args.width }}>
    <Comment {...args}/>
</div>

export const Default = TemplateDefault.bind({});
Default.args = {
    content: "This is my comment!",
    user: {
        name: "Yaroslav",
    },
    width: "300px"
};


