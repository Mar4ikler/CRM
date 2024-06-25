import { useLazyQuery } from '@apollo/client';
import Board from 'react-ui-kanban';
import { taskQueries } from '../../graphQL/task/task.queries';
import { useEffect, useState } from 'react';

const KanbanView = () => {
    const [cards, setCards] = useState([]);

    const [movedCard, setMovedCard] = useState(null);

    const handleCardDragEnd = (card, source, destination) => {
        console.log(destination);
        if (destination) {
            console.log(destination);
            setMovedCard({ card, destinationColumn: destination.id });
        }
    };

    const [getTasks] = useLazyQuery(taskQueries.GET_TASKS, {
        onCompleted: (data) => {
            const tempCards = data.getTasks.tasks.map((item) => {
                return {
                    id: item._id,
                    title: item.name.length > 24 ? item.name.slice(0, 24) + '...' : item.name,
                    description:
                        item.description.length > 105
                            ? item.description.slice(0, 105) + '...'
                            : item.description,
                    status: item.status,
                };
            });
            const fragmentedCards = {
                new: tempCards.filter((item) => item.status === 'NEW'),
                assigned: tempCards.filter((item) => item.status === 'ASSIGNED'),
                testing: tempCards.filter((item) => item.status === 'TESTING'),
                completed: tempCards.filter((item) => item.status === 'COMPLETED'),
            };
            setCards(fragmentedCards);
        },
        fetchPolicy: 'network-only',
    });

    useEffect(() => {
        getTasks({
            variables: {
                getTasksInput: { filterString: '', skip: 0, limit: -1 },
            },
        });
    }, []);

    const data = {
        lanes: [
            {
                id: 'lane1',
                title: 'New',
                cards: cards.new,
            },
            {
                id: 'lane2',
                title: 'Assigned',
                cards: cards.assigned,
            },
            {
                id: 'lane3',
                title: 'Testing',
                cards: cards.testing,
            },
            {
                id: 'lane4',
                title: 'Completed',
                cards: cards.completed,
            },
        ],
    };
    
    return (
        <Board
            data={data}
            style={{ backgroundColor: 'aliceblue' }}
        />
    );
};

export default KanbanView;
