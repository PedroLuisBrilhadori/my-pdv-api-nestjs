IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'pdv')
    BEGIN 
        CREATE DATABASE [pdv]
    END
GO