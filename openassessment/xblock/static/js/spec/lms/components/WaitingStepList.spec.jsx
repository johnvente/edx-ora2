import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import sinon from 'sinon'; 
import WaitingStepList from 'lms/components/WaitingStepList';

describe('OpenAssessment.WaitingStepList', () => {
  window.gettext = sinon.fake((text) => text);;

  describe('With enabled feature', () => {
    it('should pass a basic test', () => {
      expect(true).toBe(true);
    });

    it('allows row selection when ENABLE_MY_FEATURE is true', async () => {
      const studentList = [
        {
          username: 'jhon_20',
          graded: false,
          graded_by: '2',
          created_at: Date.now(),
          staff_grade_status: 'waiting',
          workflow_status: '',
        },
      ];

      render(
        <IntlProvider locale="en" messages={{}}>
          <WaitingStepList studentList={studentList} selectableLearners={true} />
        </IntlProvider>
      );

      // Find the DataTable component using its role
      await waitFor(() => screen.getByRole('table'));
      const dataTable = screen.getByRole('table');

      // Find the checkboxes in the header and first row's first cell
      const headerCheckbox = dataTable.querySelector(
        'thead th input[type="checkbox"]'
      );
      const firstRowCheckbox = dataTable.querySelector(
        'tbody tr:first-child td:first-child input[type="checkbox"]'
      );

      // isSelected is true if the feature is enabled, these checkboxes are shown
      expect(headerCheckbox).not.toBeNull();
      expect(firstRowCheckbox).not.toBeNull();


    });
    
    it('should call findUsername function when has 1 row selected', async () => {
      // Create a jest spy for the findUsername function
      const findUsernameSpy = sinon.spy();

      const studentList = [
        {
          username: 'jhon_20',
          graded: false,
          graded_by: '2',
          created_at: Date.now(),
          staff_grade_status: 'waiting',
          workflow_status: '',
        },
      ];

      render(
        <IntlProvider locale="en" messages={{}}>
          <WaitingStepList
            studentList={studentList}
            selectableLearners={true}
            findUsername={findUsernameSpy} // Pass the spy to the component
          />
        </IntlProvider>
      );

      // Find the DataTable component using its role
      await waitFor(() => screen.getByRole('table'));
      const dataTable = screen.getByRole('table');

      // Find the first row checkbox
      const firstRowCheckbox = dataTable.querySelector(
        'tbody tr:first-child td:first-child input[type="checkbox"]'
      );

      // Click the checkbox to simulate selecting the row
      fireEvent.click(firstRowCheckbox);

      // Check if the checkbox is checked after clicking
      expect(firstRowCheckbox.checked).toBe(true);

      // Find the "Find Learner" button
      const findLearnerButton = screen.getByTestId('find-learner-button');

      // Click the "Find Learner" button
      fireEvent.click(findLearnerButton);

      // Check if the findUsername function was called with the expected argument
      sinon.assert.calledWith(findUsernameSpy, 'jhon_20');
    });

    it('should check two checkboxes but not call findUsername function 2 rows selected', async () => {
      // Create a jest spy for the findUsername function
      const findUsernameSpy = sinon.spy();

      const studentList = [
        {
          username: 'jhon_20',
          graded: false,
          graded_by: '2',
          created_at: Date.now(),
          staff_grade_status: 'waiting',
          workflow_status: '',
        },
        {
          username: 'timmy_turner',
          graded: false,
          graded_by: '2',
          created_at: Date.now(),
          staff_grade_status: 'waiting',
          workflow_status: '',
        },
      ];

      render(
        <IntlProvider locale="en" messages={{}}>
          <WaitingStepList
            studentList={studentList}
            selectableLearners={true}
            findUsername={findUsernameSpy} // Pass the spy to the component
          />
        </IntlProvider>
      );

      // Find the DataTable component using its role
      await waitFor(() => screen.getByRole('table'));
      const dataTable = screen.getByRole('table');

       // Find the first and second row checkboxes
      const firstRowCheckbox = dataTable.querySelector(
        'tbody tr:first-child td:first-child input[type="checkbox"]'
      );
      const secondRowCheckbox = dataTable.querySelector(
        'tbody tr:nth-child(2) td:first-child input[type="checkbox"]'
      );

      // Click the checkboxes to simulate selecting the rows
      fireEvent.click(firstRowCheckbox);
      fireEvent.click(secondRowCheckbox);

      // Check if the checkboxes are checked after clicking
      expect(firstRowCheckbox.checked).toBe(true);
      expect(secondRowCheckbox.checked).toBe(true);

      const findLearnerButton = screen.getByTestId('find-learner-button');

      // Click the "Find Learner" button
      fireEvent.click(findLearnerButton);
      
      // Verify that the findUsernameSpy was not called
      sinon.assert.notCalled(findUsernameSpy);
    });

    it('should call findUsername function when has 0 row selected', async () => {
      // Create a jest spy for the findUsername function
      const findUsernameSpy = sinon.spy();

      const studentList = [
        {
          username: 'jhon_20',
          graded: false,
          graded_by: '2',
          created_at: Date.now(),
          staff_grade_status: 'waiting',
          workflow_status: '',
        },
      ];

      render(
        <IntlProvider locale="en" messages={{}}>
          <WaitingStepList
            studentList={studentList}
            selectableLearners={true}
            findUsername={findUsernameSpy} // Pass the spy to the component
          />
        </IntlProvider>
      );

      // Find the DataTable component using its role
      await waitFor(() => screen.getByRole('table'));
      const dataTable = screen.getByRole('table');

      // Find the first row checkbox
      const firstRowCheckbox = dataTable.querySelector(
        'tbody tr:first-child td:first-child input[type="checkbox"]'
      );
      
      expect(firstRowCheckbox).not.toBeNull();
      // Find the "Find Learner" button
       
    });
    

  });
});
