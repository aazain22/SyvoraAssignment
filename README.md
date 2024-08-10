# SyvoraAssignment
This repository includes both solutions of the two problem statements given to me.

Solution 1:
Desined a system that can process transactions and provide insights into the financial relationships between individuals.

Features of the system:
1. Process Transactions: The system takes a list of transactions in the form of A,B,X and processes them to update the respective debts between the individuals involved.

2. Query Debt Owed by Person: A user can query how much debt a specific person owes to all other users.

3. Query Money Owed to Person: A user can query how much money is owed to a specific person by all other users.

4. Query Person with Most Money Owed: The system can identify the person to whom the most money is owed.

5. Query Person with Most Debt: The system can identify the person who owes the most money to others.

6. Command Line Interface: The system has a command-line interface for users to input transactions and query the insights mentioned above.

7. The system is scalable that is it can handle large amount of data or entries

Solution 2:

The problem is solved by using slidin window algorithm in javaScript

heres a little explanation about the code:

1. Initial Sum Calculation: We first calculate the sum of the first k elements and initialize max to the average of these elements.

2. Sliding Window: We then slide the window across the array. For each new element added to the window, we update the current sum by subtracting the first element of the previous window and adding the new element.

3. Window Expansion: For each position of the window, we expand it to consider subarrays of length greater than k and update max if a larger average is found.

4. Return Maximum Average: Finally, after evaluating all possible subarrays, the function returns the maximum average found.