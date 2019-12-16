import { NAME } from './constants';

export const taskCounts = state => state[NAME].get('taskCounts');

export const isFetchingTaskCounts = state => state[NAME].get('isFetchingTaskCounts');

export const messageCounts = state => state[NAME].get('messageCounts');

export const isFetchingMessageCounts = state => state[NAME].get('isFetchingMessageCounts');
