import java.awt.*;
import javax.swing.*;

public class Alert extends JFrame {
    public void CreateJFrame(String title) {
        JFrame jf = new JFrame(title);
        Container container = jf.getContentPane();
        JLabel jl = new JLabel(title);
        jl.setHorizontalAlignment(SwingConstants.CENTER);

        container.add(jl);
        container.setBackground(Color.red);
        jf.setVisible(true);
        jf.setSize(600, 300);
        jf.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        System.out.println(title);
    }

    public static void main(String args[]) {
        new Alert().CreateJFrame("123");
    }
}