import java.util.Arrays;

public class Repeat {
    public static void main(String[] args) {
        int arr[] = new int[] { 23, 42, 12, 6, 10 };
        int newarr[] = Arrays.copyOfRange(arr, 0, 3);
        int newar = Arrays.binarySearch(arr, 6);
        System.out.println(newar);
        for (int i = 0; i < newarr.length; i++) {
            System.out.println(newarr[i]);
        }
    }
}