# TwoSumProblem
Two Sum Problem - - the well-known tech interview question and proposed solution aiming at (log n) square time complexity and O(1) space complexity.

The high level algorithm design is documented here.
[text](Two_Sum_with_Two-End_Trim_Toward_Logarithmic_Squared_ComplexityV_1_0.pdf)

The original work of mine, POC completed is as this file.
[text](Two_Sum_II_exercise_to_submit.js)

I asked Chatgpt to review the code. It provided a more concise version plus more test cases. Again, it is still POC protype and I don't aim it having the industry level robustness.
[text](Two_Sum_II_exercise_chatgpt.js)

With the assistance of Chatgpt, we are able to construct worst case test data. Which makes time complexity O(n).
[text](Two_Sum_II_worst_data.js)

I have been thinking of the worst case for days. According to the analysis in the pdf file, I decided to add one step per loop in the algorithm "opportunistic guessing". It is not purely opportunistic as discussed in the pdf file. Chatgpt quickly implemented the idea as a Python file.
[text](Two_Sum_with_opportunistic_guess.py)
It shows case we can beat the O(n) case with a O( log^2 n) approach.
I have not got the chance to thouroughly review the Python file. Any comments will be welcome!


Further Research
An immediate application of this problem can be for Goldbach’s conjecture as computer validation in limited scope. A large enough even number is the sum of two prime numbers. Given a large even number t and a complete list of prime numbers in scope, we can search for two prime numbers one is less than t/2 and the other is greater than t/2.

Acknowledgement
Thanks to Leetcode presenting the problem to the ardent CS students and programmers!
I used Node JS, VS Code + Copilot for the POC. 
Chatgpt greatly speeds up orginal research. Python is also used in the POC of code and visualizing important clues.
Here are some chat histories with Chatgpt:
https://chatgpt.com/share/682cc20d-57d0-8013-a706-0c460c77d0a2
https://chatgpt.com/share/682cc226-2e38-8013-9a4f-2260ee0c65e8
https://chatgpt.com/share/682cc258-324c-8013-bcdb-7d471a70e78e