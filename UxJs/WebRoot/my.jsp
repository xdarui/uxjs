 <%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="ISO-8859-1"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<%@ page import="javax.naming.*"%>
<%@ page import="javax.sql.*"%>
<%@ page import="java.sql.*"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>用户统计</title>
</head>
<body>
<%

    String method = new String(request.getParameter("method"));
    if(method.equals("list")){   }
   
     DataSource ds = null;

    try {

        Context initCtx = new InitialContext();
        Context envCtx = (Context) initCtx.lookup("java:comp/env");
        ds = (DataSource) envCtx.lookup("jdbc/rdms");
        Connection cn=ds.getConnection();
        
        
        if(cn!=null){
           Statement stmt = cn.createStatement();

         ResultSet rst = stmt.executeQuery("select * from BASE_USER");
            while(rst.next()){
                  out.println(rst.getString(1));                                         
                  out.println(rst.getString(2));
                  out.println("<br>");
            }
            
            cn.close();

        }

    } catch (NamingException e) {
        // TODO Auto-generated catch block
        out.println(e);
    } catch (SQLException e) {
        // TODO Auto-generated catch block
        out.println(e + "111");
    }

%>
</body>
</html>
