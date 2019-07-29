import java.sql.*;
public class Conn{
    Connection con;
    public Connection getConnection(){
        System.out.println("数据");
        try{
            Class.forName("com.mysql.jdbc.Driver");
            System.out.println("加载成功");
        }catch(ClassNotFoundExcepttion e){
            e.printStackTrace();
        }

        try{
            con=DriverManager.getConnection("jdbc:mysql:"+"192.168.111.134'3306/wang","root","root");
            
        System.out.println("连接成功");
        }catch(SQLException e){
            e.printStackTrace();
        }
        return con;
    }
    public static void main(String[] args){
        Conn c=new Conn();
        c.getConnection();
    }
}