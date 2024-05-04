describe('ToDo List', () => {
  it('should filter items initially', () => {
    cy.visit('/')
    
    // Verify that there are 5 total tasks
    cy.get('.btn-wrapper .btn-menu:nth-child(1)').click();
    cy.get('app-item').its('length').should('eq', 5);
    // Verify the order and descriptions of the tasks
    cy.get('app-item label').eq(0).should('have.text', 'Start a project');

    // Verify that there are 3 todo tasks
    cy.get('.btn-wrapper .btn-menu:nth-child(2)').click();
    cy.get('app-item').its('length').should('eq', 3);
    cy.get('app-item label').eq(0).should('have.text', 'Exercise');

    // Verify that there are 2 done tasks
    cy.get('.btn-wrapper .btn-menu:nth-child(3)').click();
    cy.get('app-item').its('length').should('eq', 2);
    cy.get('app-item label').eq(0).should('have.text', 'Start a project');
    cy.get('app-item label').eq(1).should('have.text', 'Read a book');
  })

  it('should uncheck a completed task', () => {
    cy.visit('/')
    
    cy.get('.btn-wrapper .btn-menu:nth-child(1)').click();
    cy.get('app-item label').contains('Read a book').click()

    cy.get('app-item').its('length').should('eq', 5); // 5 total tasks
    cy.get('h2').should('contain.text','5 items'); // Verify that the heading is correct

    cy.get('.btn-wrapper .btn-menu:nth-child(2)').click();
    cy.get('app-item').its('length').should('eq', 4); // 1 more todo task
    cy.get('h2').should('contain.text','4 items');
    cy.get('app-item label').contains('Read a book').should('exist');

    cy.get('.btn-wrapper .btn-menu:nth-child(3)').click();
    cy.get('app-item').its('length').should('eq', 1); // 1 less done task
    cy.get('h2').should('contain.text','1 item');
    cy.get('app-item label').contains('Read a book').should('not.exist');

  })

  it('should complete a task', () => {
    cy.visit('/')

    cy.get('.btn-wrapper .btn-menu:nth-child(1)').click();
    cy.get('app-item label').contains('Respond to emails').click()
    
    cy.get('app-item').its('length').should('eq', 5); // 5 total tasks

    cy.get('.btn-wrapper .btn-menu:nth-child(2)').click();
    cy.get('app-item').its('length').should('eq', 2); // 1 less todo task
    cy.get('app-item label').contains('Respond to emails').should('not.exist');

    cy.get('.btn-wrapper .btn-menu:nth-child(3)').click();
    cy.get('app-item').its('length').should('eq', 3); // 1 more done task
    cy.get('app-item label').contains('Respond to emails').should('exist');
  })

  it('should complete all tasks', () => {
    cy.visit('/')

    cy.get('.btn-wrapper .btn-menu:nth-child(2)').click();
    cy.get('app-item label').each(label => {
      cy.wrap(label).click();
    });
    
    cy.get('app-item').should('have.length', 0); // no todo tasks

    cy.get('.btn-wrapper .btn-menu:nth-child(1)').click();
    cy.get('app-item').its('length').should('eq', 5); // 5 total tasks

    cy.get('.btn-wrapper .btn-menu:nth-child(3)').click();
    cy.get('app-item').its('length').should('eq', 5); // all tasks done
  })

  it('should remove a task', () => {
    cy.visit('/')

    cy.get('.btn-wrapper .btn-menu:nth-child(2)').click();
    cy.get('app-item label').eq(0).invoke('text').then((text) => {
      cy.get('button.btn.btn-warn').eq(0).click();
      cy.get('app-item').its('length').should('eq', 2); // 1 less todo task
      cy.get('app-item label').contains(text).should('not.exist');

      cy.get('.btn-wrapper .btn-menu:nth-child(1)').click();
      cy.get('app-item').its('length').should('eq', 4); // 4 total tasks
      cy.get('app-item label').contains(text).should('not.exist');

      cy.get('.btn-wrapper .btn-menu:nth-child(3)').click();
      cy.get('app-item').its('length').should('eq', 2); // Same number of done tasks
      cy.get('app-item label').contains(text).should('not.exist');
    });
  })

  it('should remove all tasks', () => {
    cy.visit('/')

    cy.get('.btn-wrapper .btn-menu:nth-child(2)').click();
    cy.get('button.btn.btn-warn').eq(0).click();

    cy.get('.btn-wrapper .btn-menu:nth-child(3)').click();
    cy.get('button.btn.btn-warn').eq(0).click();

    // Test if there are 0 items in a filter
    cy.get('.btn-wrapper .btn-menu:nth-child(3)').click();
    cy.get('app-item label').eq(0).invoke('text').then((text) => {
      cy.get('button.btn.btn-warn').eq(0).click();
      cy.get('app-item').should('have.length', 0); // 1 less done task

      cy.get('.btn-wrapper .btn-menu:nth-child(1)').click();
      cy.get('app-item').its('length').should('eq', 2); // 2 total tasks
      cy.get('app-item label').contains(text).should('not.exist');

      cy.get('.btn-wrapper .btn-menu:nth-child(2)').click();
      cy.get('app-item').its('length').should('eq', 2); // Same number of todo tasks
      cy.get('app-item label').contains(text).should('not.exist');
    });

    cy.get('button.btn.btn-warn').eq(0).click();
    cy.get('button.btn.btn-warn').eq(0).click();

    cy.get('app-item').should('have.length', 0); // no tasks

    cy.get('.btn-wrapper .btn-menu:nth-child(1)').click();
    cy.get('app-item').should('have.length', 0);

    cy.get('.btn-wrapper .btn-menu:nth-child(3)').click();
    cy.get('app-item').should('have.length', 0);
  })

  it('should not add an empty task', () => {
    cy.visit('/')

    cy.get('#addItemInput').click();
    cy.get('button.btn-primary').click();
    
    cy.get('app-item').its('length').should('eq', 5); // Same number of total tasks
  })

  it('should add a nonempty task', () => {
    cy.visit('/')

    cy.get('#addItemInput').type('Plant a tree');
    cy.get('button.btn-primary').click();
    
    cy.get('.btn-wrapper .btn-menu:nth-child(1)').click();
    cy.get('app-item').its('length').should('eq', 6); // 1 more tasks
    cy.get('app-item label').contains('Plant a tree').should('exist');

    cy.get('.btn-wrapper .btn-menu:nth-child(2)').click();
    cy.get('app-item').its('length').should('eq', 4); // 1 more todo task
    cy.get('app-item label').contains('Plant a tree').should('exist');

    cy.get('.btn-wrapper .btn-menu:nth-child(3)').click();
    cy.get('app-item').its('length').should('eq', 2); // No change in done tasks
    cy.get('app-item label').contains('Plant a tree').should('not.exist');
  })

  it('should edit a task', () => {
    cy.visit('/')

    cy.get('.btn-wrapper .btn-menu:nth-child(2)').click();

    cy.get('app-item label').eq(0).invoke('text').then((text) => {
      cy.get('app-item button.btn').eq(0).click();
      cy.get('input.sm-text-input').eq(0).clear().type('Wash dishes');
      cy.contains('button.btn', 'Cancel').click();
      cy.get('app-item label').contains('Wash dishes').should('not.exist');
      cy.get('app-item label').contains(text).should('exist');

      cy.get('app-item button.btn').eq(0).click();
      cy.get('input.sm-text-input').eq(0).clear().type('Wash dishes');
      cy.contains('button.btn', 'Save').click();
      cy.get('app-item label').contains('Wash dishes').should('exist');
      cy.get('app-item label').contains(text).should('not.exist');

      cy.get('.btn-wrapper .btn-menu:nth-child(1)').click();
      cy.get('app-item label').contains('Wash dishes').should('exist');
      cy.get('app-item label').contains(text).should('not.exist');
    });
  }) 
})
