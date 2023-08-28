
import { Section } from './Section/Section';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Notification } from './Notification/Notification';
import { useState } from 'react';

export const App = () => {
  const [app, setApp] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  })
  


  const onLeaveFeedback = (option) => {
    setApp(prevState => ({
      ...prevState,[option]: prevState[option] + 1,
    }));
  };

  const countTotalFeedback = () => {
    return Object.values(app).reduce((acc, item) => acc + item, 0);
  }

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const { good } = app;
    return Math.round((good / total) * 100);
  }

  
    const total = countTotalFeedback();

    const percent = countPositiveFeedbackPercentage();
   

    return (
      <div>
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={Object.keys(app)}
            onLeaveFeedback={onLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {total > 0 ? (
            <Statistics
              good={app.good}
              neutral={app.neutral}
              bad={app.bad}
              total={total}
              positivePercentage={percent}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }

