/*    ==Scripting Parameters==

    Source Server Version : SQL Server 2016 (13.0.4001)
    Source Database Engine Edition : Microsoft SQL Server Express Edition
    Source Database Engine Type : Standalone SQL Server

    Target Server Version : SQL Server 2017
    Target Database Engine Edition : Microsoft SQL Server Standard Edition
    Target Database Engine Type : Standalone SQL Server
*/
USE [analysis]
GO
/****** Object:  Table [dbo].[all_tags]    Script Date: 10/17/2017 4:00:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[all_tags](
	[archiving] [smallint] NOT NULL,
	[changedate] [datetime2](7) NOT NULL,
	[changer] [nvarchar](4000) NOT NULL,
	[compdev] [real] NOT NULL,
	[compdevpercent] [real] NOT NULL,
	[compmax] [float] NOT NULL,
	[compmin] [int] NOT NULL,
	[compressing] [smallint] NOT NULL,
	[creationdate] [datetime2](7) NOT NULL,
	[creator] [nvarchar](4000) NOT NULL,
	[dataaccess] [nvarchar](4000) NOT NULL,
	[datagroup] [nvarchar](4000) NOT NULL,
	[dataowner] [nvarchar](4000) NOT NULL,
	[datasecurity] [nvarchar](4000) NOT NULL,
	[descriptor] [nvarchar](4000) NOT NULL,
	[digitalset] [nvarchar](4000) NOT NULL,
	[displaydigits] [smallint] NOT NULL,
	[engunits] [nvarchar](4000) NOT NULL,
	[excdev] [real] NOT NULL,
	[excdevpercent] [real] NOT NULL,
	[excmax] [float] NOT NULL,
	[excmin] [int] NOT NULL,
	[exdesc] [nvarchar](4000) NOT NULL,
	[future] [smallint] NOT NULL,
	[pointid] [float] NOT NULL,
	[pointnumber] [float] NOT NULL,
	[pointsource] [nvarchar](4000) NOT NULL,
	[pointtype] [nvarchar](4000) NOT NULL,
	[pointtypex] [nvarchar](4000) NOT NULL,
	[ptaccess] [nvarchar](4000) NOT NULL,
	[ptclassid] [float] NOT NULL,
	[ptclassname] [nvarchar](4000) NOT NULL,
	[ptclassrev] [float] NOT NULL,
	[ptgroup] [nvarchar](4000) NOT NULL,
	[ptowner] [nvarchar](4000) NOT NULL,
	[ptsecurity] [nvarchar](4000) NOT NULL,
	[scan] [smallint] NOT NULL,
	[shutdown] [smallint] NOT NULL,
	[sourcetag] [nvarchar](4000) NOT NULL,
	[span] [real] NOT NULL,
	[step] [smallint] NOT NULL,
	[tag] [nvarchar](4000) NOT NULL,
	[typicalvalue] [real] NOT NULL,
	[zero] [real] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PI_TAGS_V2]    Script Date: 10/17/2017 4:00:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PI_TAGS_V2](
	[TAG] [nvarchar](4000) NOT NULL,
	[ACTUAL_TIMESTAMP] [datetime] NULL,
	[SOURCE] [nvarchar](50) NULL,
	[STARTDATE] [datetime] NULL,
	[ENDDATE] [datetime] NULL,
	[REFERENCE] [nvarchar](255) NULL,
	[FAILED] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_HISTORY_10M_Pressure]    Script Date: 10/17/2017 4:00:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_HISTORY_10M_Pressure](
	[tag] [nvarchar](4000) NOT NULL,
	[time] [datetime2](7) NOT NULL,
	[value] [float] NULL,
	[attribute] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_HISTORY_2M_Pressure]    Script Date: 10/17/2017 4:00:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_HISTORY_2M_Pressure](
	[tag] [nvarchar](4000) NOT NULL,
	[time] [datetime2](7) NOT NULL,
	[value] [float] NULL,
	[attribute] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_HISTORY_5M_CORRELATION]    Script Date: 10/17/2017 4:00:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_HISTORY_5M_CORRELATION](
	[tag] [nvarchar](4000) NOT NULL,
	[time] [datetime2](7) NOT NULL,
	[value] [float] NULL,
	[attribute] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_HISTORY_5M_Pressure]    Script Date: 10/17/2017 4:00:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_HISTORY_5M_Pressure](
	[tag] [nvarchar](4000) NOT NULL,
	[time] [datetime2](7) NOT NULL,
	[value] [float] NULL,
	[attribute] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_HISTORY_COMP_Pressure]    Script Date: 10/17/2017 4:00:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_HISTORY_COMP_Pressure](
	[tag] [nvarchar](4000) NOT NULL,
	[time] [datetime2](7) NOT NULL,
	[value] [float] NULL,
	[attribute] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_HISTORY_FAILED]    Script Date: 10/17/2017 4:00:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_HISTORY_FAILED](
	[tag] [nvarchar](4000) NOT NULL,
	[time] [datetime2](7) NOT NULL,
	[ERROR_MSG] [nvarchar](4000) NULL,
	[SQL] [nvarchar](4000) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_RUNTIME]    Script Date: 10/17/2017 4:00:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_RUNTIME](
	[DURATION] [int] NOT NULL,
	[CREATE_TIME] [datetime] NOT NULL,
	[TAG] [nvarchar](100) NULL
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[EXPORT_PICENT]    Script Date: 10/17/2017 4:00:39 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[EXPORT_PICENT]
	@parameter nvarchar (50) = '10M'
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

declare @runtime datetime
declare @start datetime
declare @end datetime
declare @sql nvarchar (2000)
declare @create nvarchar (2000)
declare @duration datetime
declare @enddate datetime
declare @tag nvarchar (1024)
declare @source nvarchar (1024)
declare @reference nvarchar (255)
DECLARE @cnt INT = 0;
DECLARE @increae INT = 5;

WHILE @cnt < 500
BEGIN


SELECT top 1   @tag = Tag,  @start = ACTUAL_TIMESTAMP, @source=  [SOURCE], @reference= REFERENCE, @enddate= ENDDATE
  FROM [dbo].PI_TAGS_V2
  where ACTUAL_TIMESTAMP < GETUTCDATE() and tag like '%' and [SOURCE] = @parameter and ENDDATE > ACTUAL_TIMESTAMP and (FAILED is null or datediff(MINUTE,FAILED, GETUTCDATE()) > 90)
  order by ACTUAL_TIMESTAMP  

  set @enddate = coalesce(@enddate, GETUTCDATE())
   
  if @start > @enddate
  begin
  set @cnt = 600
  break
  end


  set @end = dateadd(second,-1,DATEADD(DAY,@increae,@start))



if @source = 'COMP'
begin
set @sql = 'select tag, value,time, status as pctgood FROM [piarchive]..[picomp2] 
where (
tag like '''+@tag+'''
) and time between ''' + convert(nvarchar,@start,20)+''' and '''+ convert(nvarchar,@end,20)+''''
end
else
begin

set @sql = 'select tag, value,time,pctgood FROM [piarchive]..[piavg] 
where (
tag like '''+@tag+'''
)  and timestep = '''+LOWER(@source)+''' and calcbasis = ''EventWeighted'' and time between ''' + convert(nvarchar,@start,20)+''' and '''+ convert(nvarchar,@end,20)+''''
end

IF OBJECT_ID (N'analysis.dbo.[T_HISTORY_' + @source +'_' + @reference +']', N'U') IS NULL 
begin
	set @create = 'CREATE TABLE [dbo].[T_HISTORY_' + @source +'_' + @reference +']([tag] [nvarchar](4000) NOT NULL, [time] [datetime2](7) NOT NULL, ' +
	'[value] [float] NULL, [attribute] [int] NULL) ON [PRIMARY] '
	exec (@create)
end
	

set  @sql = 'INSERT INTO analysis.dbo.[T_HISTORY_' + @source +'_' + @reference +'] SELECT [tag], [time],[value],[pctgood] FROM OPENQUERY(PIBRIDGE,''' + REPLACE(@sql,'''','''''') + ''')'
set @duration = GETUTCDATE()


set @runtime = GETUTCDATE()

IF datepart(hour,GETUTCDATE()) between 1 and 5 
	WAITFOR DELAY '00:00:10';
--else
--	WAITFOR DELAY '00:00:01';


  BEGIN TRY
exec (@sql)

insert into dbo.T_RUNTIME (DURATION, CREATE_TIME, TAG)
values (datediff(MILLISECOND,@runtime, GETUTCDATE()), GETUTCDATE(), @tag)

 Update  [dbo].PI_TAGS_V2
  set ACTUAL_TIMESTAMP = DATEADD(DAY,@increae,@start)
  where Tag = @tag


   END TRY
   BEGIN CATCH
   INSERT INTO dbo.T_HISTORY_FAILED(tag,time, ERROR_MSG) values( @tag, @start, ERROR_MESSAGE ( ) )

    Update [dbo].PI_TAGS_V2
  set FAILED = GETUTCDATE()
  where Tag = @tag
 
   END CATCH

     SET @cnt = @cnt + 1;

   
END



END
GO
